class Poll < ApplicationRecord
  has_many :choices
  belongs_to :user
end
