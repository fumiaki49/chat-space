# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, unique: true|
|e-mail|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, thorugh: :members
- has_many :members
- has_many :messages
- has_many :images

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, unique: true|

### Association
- has_many :groups, thorugh: :members
- has_many :members
- has_many :messages
- has_many :images

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: :true|
|group_id|integer|null: false, foreign_key: :true|

### Association
- belongs_to :user
- belongs_to :group

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|user_id|integer|null: false, foreign_key: :true|
|group_id|integer|null: false, foreign_key: :true|

### Association
- belongs_to :user
- belongs_to :group

## imageテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|user_id|integer|null: false, foreign_key: :true|
|group_id|integer|null: false, foreign_key: :true|

### Association
- belongs_to :user
- belongs_to :group