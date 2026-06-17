# Gabbi website 素材整理说明

这个文件夹是给个人网页准备图片和文字用的。你不需要改代码，先把素材按模块放好，然后告诉我“我已经放好了”，我就可以帮你把内容接进网页。

## 1. 图片怎么放

建议图片格式：

- 优先用 `.jpg` / `.jpeg` / `.png` / `.webp`
- 单张图片建议小于 5MB，网页会更快
- 横图适合旅行城市、地图弹窗、兴趣展示
- 竖图适合人物、自我介绍、生活技能细节
- 不建议直接放 Live Photo、视频或 HEIC；如果是 iPhone 照片，最好先导出为 JPG

## 2. 可以直接修改图片名称吗

可以，而且推荐你改成好懂的英文或拼音文件名。

推荐格式：

```text
city-topic-number.jpg
hongkong-harbour-01.jpg
paris-cafe-01.jpg
cooking-dinner-01.jpg
coffee-latte-01.jpg
hiking-lake-01.jpg
```

命名要求：

- 尽量不用中文文件名，避免网页路径出错
- 不用空格，用短横线 `-`
- 不用特殊符号，比如 `#`、`?`、`&`
- 同一个地点多张图，用 `01`、`02`、`03`

## 3. 各模块应该放哪里

### 01_about_me

放自我介绍相关内容。

- `text`：你的自我介绍文字
- `photos`：头像、生活照、适合首页展示的照片

### 02_travel_map

放地图和旅行经历相关内容。

- `visited_places/china`：中国省份、香港、澳门相关照片
- `visited_places/asia`：泰国、越南、马来西亚、日本、韩国、新加坡等照片
- `visited_places/canada`：多伦多、温哥华、卡尔加里照片
- `visited_places/australia`：悉尼、墨尔本照片
- `planned_europe`：欧洲计划探索城市的图片或灵感图
- `city_photo_sets`：如果你想按城市整理，可以在这里新建城市文件夹，比如 `paris`、`berlin`、`hongkong`

### 03_life_skills

放生活技能展示。

- `cooking`：做过的饭、一起吃饭、厨房照片
- `coffee`：咖啡、拉花、手冲、早餐
- `home_and_hosting`：整理空间、家务、布置、和 host 共同生活相关照片

### 04_hobbies

放兴趣爱好。

- `hiking`：徒步、山、湖、自然路线
- `skiing`：滑雪、雪山、装备
- `ball_games`：羽毛球、网球、篮球等
- `city_walks`：市集、书店、展览、城市漫步

### 05_current_route

放近期旅途轨迹。

- `text`：日期、城市、计划活动
- `photos`：路线截图、车票、城市灵感图

### 06_contact

放联系方式。

- `qr_codes`：微信、小红书、WhatsApp、Instagram、Threads 二维码
- `profile_screenshots`：社交主页截图

### 07_original_photos_backup

放原图备份。这里的图可以很大，不一定直接放进网页。

### 08_ready_for_website

放最终确定要用于网页的精选图片。后面我接入网页时，优先从这里取图。

## 4. 文字怎么添加

你可以用两种方式：

1. 直接把文字发给我
2. 在对应文件夹里新建 `.txt` 或 `.md` 文件

推荐使用 `.md` 文件，因为方便分段和写标题。

例如：

```text
02_travel_map/city_photo_sets/paris/paris-text.md
03_life_skills/cooking/cooking-text.md
05_current_route/text/route-plan.md
```

## 5. 每个城市建议给我的信息

```text
城市：
去过 / 计划去：
时间：
一句话印象：
想展示的照片文件名：
照片说明：
想让 host 了解的小故事：
```

## 6. 最省事的做法

你可以先只做三件事：

1. 把照片按模块丢进对应文件夹
2. 把图片文件名改成英文或拼音
3. 发我一句：“我放好了，请帮我接入网页”

我会再帮你整理、筛选、压缩和接入页面。
