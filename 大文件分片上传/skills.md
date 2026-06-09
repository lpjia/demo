# 变更记录技能

## 效果

每次 Claude Code 修改完代码后，自动将本次变更重点记录到 `CHANGELOG/` 目录下。

## 实现方式

### 1. 在 `.claude/settings.json` 中注册技能

```json
{
  "skills": {
    "记变更": {
      "description": "将本次代码变更记录到 CHANGELOG 目录",
      "prompt": "将本次会话中已完成的代码变更直接记录到 CHANGELOG/ 目录下。\n\n要求：\n1. 按当天日期命名文件，如 CHANGELOG/2026-05-05.md\n2. 只记重点，格式如下：\n\n```markdown\n# 2026-05-05\n\n## 改动文件\n- 路径/文件 — 改了XX功能\n\n## 关键变更\n1. 具体改动和原因\n\n## 依赖变更\n- 新增/移除/升级了哪些包\n\n## 备注\n- 待办事项、已知问题\n```\n\n注意：\n- 基于你刚刚完成的修改来记录，不要查 git diff\n- 不要逐行罗列代码，提炼核心变化\n- 如果今天的文件已存在，追加新的变更内容"
    }
  }
}
```

### 2. 在 `CLAUDE.md` 中添加自动触发指令

项目根目录创建或编辑 `CLAUDE.md`：

```markdown
## 自动变更记录

每次使用 Edit / Write / NotebookEdit 工具修改代码后，自动调用 `/记变更` 技能，将本次变更记录到 `CHANGELOG/` 目录下。
```

### 3. 最终目录结构

```
项目根目录/
├── .claude/
│   └── settings.json    # 技能定义
├── CLAUDE.md             # 告诉 Claude 每次改完代码自动记变更
├── CHANGELOG/
│   ├── 2026-05-05.md
│   └── 2026-05-06.md
└── ...
```

## 变更记录示例

```markdown
# 2026-05-05

## 改动文件
- `src/uploader.ts` — 重构分片上传逻辑，支持断点续传
- `src/api.ts` — 新增 resumeUpload 接口

## 关键变更
1. 断点续传：上传前检查已上传分片，跳过已完成的分片
2. 错误重试：网络中断后自动重试最多 3 次

## 依赖变更
- 新增 axios@1.7.0

## 备注
- 后端需要配合新增 /upload/resume 接口
```
