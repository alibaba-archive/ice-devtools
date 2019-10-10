
## ice-devtools 相关能力迁移至 iceworks CLI，ice-devtools 将逐步下线，相关代码：

- [iceworks CLI](https://github.com/alibaba/ice/tree/master/tools/iceworks-cli)
- [templates](https://github.com/alibaba/ice/tree/master/packages)

--------

# ice-devtools

Devtools for develop materials such as scaffold, block and component. [Docs](https://ice.work/docs/materials/about)

## Installation

```bash
$ npm install ice-devtools -g
$ idev -V
```

## Introduction

- Support React/Vue/Angular material template
- Custom material template
- Init and develop materials
- Generate material data
- Sync the data to unpkg or fusion.design and get a url
- Use in iceworks by the url

## Getting Started

Init materials:

```bash
$ idev init
```

Develop a block material:

```bash
$ cd blocks/ExampleBlock
$ npm install
$ npm start
```

Use npm publish each material, and then generate the materials data:

```bash
$ npm run generate
```

## Contributors

Feel free to report any questions as an [issue](https://github.com/alibaba/ice/issues/new), we'd love to have your helping hand on `ice-scripts`.

If you're interested in `icestore`, see [CONTRIBUTING.md](https://github.com/alibaba/ice/blob/master/.github/CONTRIBUTING.md) for more information to learn how to get started.

## License

[MIT](LICENSE)
