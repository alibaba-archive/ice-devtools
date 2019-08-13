const kebabCase = require('kebab-case');
const chalk = require('chalk');
const { isAliNpm } = require('ice-npm-utils');
const request = require('request-promise-native');

/**
 * 获取 npm 包名
 * @param {string} name
 * @param {string} npmPrefix
 */
function generateNpmNameByPrefix(name, npmPrefix) {
  return npmPrefix + kebabCase(name).replace(/^-/, '');
}

/**
 * 检测 NPM 包是否已发送，并返回包的发布时间
 * @param  {string} npm      package name
 * @param  {String} version  pacage version
 * @param  {String} registry npm registry
 * @return {array}
 *         [code, resute]
 */
function getNpmTime(npm, version = 'latest') {
  // 这里不使用 ice-npm-utils 里的 getNpmRegistry 原因：
  // 发布到私有 npm，走 env 自定义逻辑；发布到官方 npm，走官方源的逻辑
  // getNpmRegistry 默认是淘宝源，同步官方源有延迟，因此不能用
  let registry = 'https://registry.npmjs.org';
  if (process.env.REGISTRY) {
    registry = process.env.REGISTRY;
  } else if (isAliNpm(npm)) {
    registry = 'https://registry.npm.alibaba-inc.com';
  }
  const url = `${registry}/${npm}`;

  return request.get(url)
    .then((response) => {
      const data = JSON.parse(response);
      if (!data.time) {
        console.error(chalk.red('time 字段不存在'));
        return Promise.reject(new Error(`${npm}@${version} time 字段不存在`));
      }
      // 传进来的可能是 latest 这种非 数字型的 版本号
      const distTags = data['dist-tags'];
      version = distTags[version] || version;
      const { versions } = data;
      if (!versions || versions[version] === undefined) {
        return Promise.reject(new Error(`${npm}@${version} 未发布! 禁止提交!`));
      }
      return data.time;
    })
    .catch((err) => {
      if (
        (err.response && err.response.status === 404)
        || err.message === 'Not found' // tnpm
        || /not found/i.test(err.message) // tnpm
        || err.message === 'not_found' // npm
      ) {
        // 这种情况是该 npm 包名一次都没有发布过
        return Promise.reject(new Error(`[ERR checkAndQueryNpmTime] ${npm}@${version} 包未发布! 禁止提交!`));
      }

      return Promise.reject(err);
    });
}

module.exports = {
  generateNpmNameByPrefix,
  getNpmTime,
};
