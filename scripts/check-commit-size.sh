#!/bin/bash

# 定义最大允许的提交大小，这里设置为 1kb
MAX_SIZE=$((1 * 1024))

# 获取本次提交的文件列表
files=$(git diff --cached --name-only --diff-filter=ACM)

# 初始化总大小为 0
total_size=0

# 遍历每个文件并计算总大小
for file in $files; do
    if [ -f "$file" ]; then
        size=$(stat -c%s "$file")
        total_size=$((total_size + size))
    fi
done

# 检查总大小是否超过最大允许大小
if [ $total_size -gt $MAX_SIZE ]; then
    echo "Error: The total size of the commit ($((total_size / 1024 / 1024))MB) exceeds the limit of 30MB."
    exit 1
fi

# 如果未超过限制，允许提交
exit 0
