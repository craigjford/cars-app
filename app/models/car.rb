class Car < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  has_many :repairs
end
