---
outline: deep
prev: false
next: false



---

<h1>Github Actions</h1>

[官网文档](https://docs.github.com/zh/actions)



## 介绍

GitHub Actions 是 GitHub 提供的一项服务，是一种持续集成和持续交付 (CI/CD) 平台，用于自动化软件开发工作流程。它允许在代码存储库中设置自定义工作流程，以响应各种事件，如代码提交、拉取请求、问题的创建等。

GitHub Actions 的工作流程是使用 YAML 文件定义的，其中包括触发事件、作业和步骤等元素。这些工作流程可以用于持续集成、持续部署和其他自动化任务。

例如，在 vitepress 项目中自动将项目发布为 github page，在代码提交后自动运行测试脚本



## [GitHub Actions 的组件](https://docs.github.com/zh/actions/learn-github-actions/understanding-github-actions#github-actions-的组件)

工作流包含一个或多个可按顺序或并行运行的作业。 每个作业都将在其自己的虚拟机运行器中或在容器中运行，并具有一个或多个步骤，用于运行定义的脚本或运行动作。动作是一个可重用的扩展，可简化工作流 。

### 工作流

工作流是一个可配置的自动化过程，它将运行一个或多个作业。由仓库中的`.github/workflows`目录中的 yaml 格式的文件定义，可以配置多个工作流程，每个流程可以执行不同的任务集。 例如，可以有一个工作流程来构建和测试拉取请求，另一个工作流程用于在每次创建发布时部署应用程序，还有一个工作流程在每次有人打开新议题时添加标签



### 事件

事件是存储库中触发工作流程运行的特定活动，例如，当有人创建拉取请求、打开议题或将提交推送到存储库时，活动可能源自 GitHub，也可以通过发布到 REST API 或者手动方式触发工作流。

可以在[官方文档](https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows)查看所有可以触发工作流的事件



### 作业

作业是工作流中在同一运行器上执行的一组步骤。 每个步骤是一个将要执行的 shell 脚本，或者一个将要运行的动作。 

- 步骤按顺序执行，并且相互依赖。 由于每个步骤都在同一运行器上执行，因此可以将数据从一个步骤共享到另一个步骤。
- 可以配置作业之间的依赖关系（默认没有依赖关系），且并行运行。当一个作业依赖另一个作业时，它将等待从属作业完成，然后才运行。



### 操作

操作是用于 GitHub Actions 平台的自定义应用程序，它执行复杂但经常重复的任务。 使用操作可帮助减少在工作流程文件中编写的重复代码量。 例如：可以从 GitHub 拉取 git 存储库，为构建环境设置正确的工具链，可以对云服务商的身份验证。

可以编写自己的操作，也可以在 GitHub Marketplace 中找到要在工作流程中使用的操作。

[官方文档 - 创建操作](https://docs.github.com/zh/actions/creating-actions) | [官方Marketplace](https://github.com/marketplace)



## 工作流程语法

工作流程是可配置的自动化过程，由一个或多个作业组成。 配置文件使用 YAML 语法，必须存放在仓库的`.github/workflows`目录中，

顶级配置项有以下几种：

### name

工作流名称，会显示在 github 仓库的 actions 选项卡下，如果省略，则显示工作流文件相对根目录的文件路径

### run-name

从工作流生成的工作流运行的名称

示例：
```yaml
run-name: Deploy to ${{ inputs.deploy_target }} by @${{ github.actor }}
```

### on

on 用来声明当 GitHub 上发生特定活动时、在预定的时间，或者在 GitHub 外部的事件发生时运行工作流程。

可以定义单个或多个可以触发工作流的事件、活动，或设置时间计划，还可以将工作流的执行限制为仅针对特定文件、标记或分支更改。

github 预设了很多触发工作流的事件，例如：

- push：在推送提交或 tag 时，可以使用 branches 声明仅推送到特定分支时运行
- release：在仓库中发生发布活动时运行
- label：在创建或修改仓库中的标签时运行
- watch：在仓库加星时运行
- fork：当有人 fork 仓库时运行



### jobs

工作流由一个或多个 `jobs` 组成，默认情况下并行运行。若要按顺序运行作业，可以使用 `jobs.<job_id>.needs` 关键字定义对其他作业的依赖关系。



### permissions

在每个工作流开始时，github 会自动创建唯一的 `GITHUB_TOKEN` 令牌在工作流中进行身份验证。

可以使用 `permissions` 修改授予 `GITHUB_TOKEN` 的默认权限，根据需要添加或删除访问权限，以便只授予所需的最低访问权限。

可以使用 `permissions` 作为顶级密钥，以应用于工作流中的所有作业或特定作业。



### env

环境变量的 map

通过`jobs.<job_id>.env`设置仅用于单个作业的环境变量

通过`jobs.<job_id>.step[*].env`设置仅用于单个作业步骤的环境变量



### defaults

创建将应用于工作流中所有作业的默认设置的map。

也可以在 `jobs.<job_id>.defaults` 设置只可用于作业的默认设置



### occurrency

使用 `concurrency` 以确保只有使用相同并发组的单一作业或工作流才会同时运行



## 其他示例

[Domain Admin - 基于Python + Vue3的域名和SSL证书监测平台](https://github.com/mouday/domain-admin/tree/master/.github/workflows)

[vue-route](https://github.com/vuejs/router/tree/main/.github/workflows)

