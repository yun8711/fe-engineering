官方给出的所有配置项的默认值，自己加了说明

```json
{
  "hooks": {},
  "git": {
    // 默认产出 changelog 的格式
    "changelog": "git log --pretty=format:\"* %s (%h)\" ${from}...${to}",
    // 是否在运行release-it之前，保持工作区干净，也就是所有文件已提交
    "requireCleanWorkingDir": true,
    // 指定在哪个分支可以使用 release-it 升级版本，可以用数组指定多个
    "requireBranch": false,
    // 是否需要上游分支，如果没有上游分支，git push 不知道如何推送。一般在git 未推送到远程前设置为false
    "requireUpstream": true,
     // 是否允许空提交，也就是在发新版本前，到上个版本之间，必须有commit，默认为false，即允许空提交
    "requireCommits": false,
    "requireCommitsFail": true,
    "commitsPath": "",
    // 是否提交未跟踪的文件，默认为false，即：未跟踪的文件不会被提交
    "addUntrackedFiles": false,
    "commit": true,
    // 完成版本更新后git 提交的消息
    "commitMessage": "Release ${version}",
    // 向git commit 提供额外的参数
    "commitArgs": [],
    // 版本升级时是否创建标签
    "tag": true,
    // 标签排除：排除某个tag，覆盖正常行为以查找最新标签，如："*[-]*"
    "tagExclude": null,
    // 设置自定义标签，如：'v${version}'
    "tagName": null,
    // 标签匹配：覆盖正常行为，以查找最新标签，一个glob 表达式，如："[0-9]*\.[0-9]*\.[0-9]*"
    "tagMatch": null,
    // 是否使用使用分支的标签来确定最新标签，默认 false，即只考虑主分支
    "getLatestTagFromAllRefs": false,
    // 指定添加标签时的注释
    "tagAnnotation": "Release ${version}",
    // 执行 git tag 时的参数
    "tagArgs": [],
    // 是否执行 git push 步骤
    "push": true,
    // 执行 git push 时的额外参数，默认会同时推送 tag
    "pushArgs": ["--follow-tags"],
    // git push 的仓库地址
    "pushRepo": ""
  },
  "npm": {
    // 是否执行 npm publish 以发布到npm
    "publish": true,
    // 发布路径，默认是当前根文件夹，用于仅发布特定文件
    "publishPath": ".",
    // 传递给npm publish 的额外参数，如：["--include-workspace-root"]
    "publishArgs": [],
    // 标记存储库中的包，默认是 latest
    "tag": null,
    //双因素身份验证 (2FA)
    "otp": null,
    //忽略 package.json 中的version 字段，使用最新的 git tag 代替
    "ignoreVersion": false,
    "allowSameVersion": false,
    // 传递给npm version 的额外参数，如：["--allow-same-version", "--workspaces-update=false"]
    "versionArgs": [],
    // 是否跳过 npm 发布前的检查：npm ping、npm whoami、npm access
    "skipChecks": false,
    "timeout": 10
  },
  "github": {
    // 是否发布到 github
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "autoGenerate": false,
    "preRelease": false,
    "draft": false,
    "tokenRef": "GITHUB_TOKEN",
    "assets": null,
    "host": null,
    "timeout": 0,
    "proxy": null,
    "skipChecks": false,
    "web": false,
    "comments": {
      "submit": false,
      "issue": ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
      "pr": ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
    }
  },
  "gitlab": {
    // 是否发布到 gitlab
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "milestones": [],
    "tokenRef": "GITLAB_TOKEN",
    "tokenHeader": "Private-Token",
    // https 下CA 证书，如："./my-root-ca.crt"
    "certificateAuthorityFile": null,
    // 上传二进制版本的文件，如：["dist/*.dmg"],
    "assets": null,
    // 设置gitlab源
    "origin": null,
    "skipChecks": false
  }
}
```

