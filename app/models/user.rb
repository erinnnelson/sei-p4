class User < ApplicationRecord
  has_and_belongs_to_many :choices
  has_many :polls, dependent: :destroy
end
