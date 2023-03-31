class Car < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  has_many :repairs, dependent: :destroy

  validates :year, :make, :model, presence: true
  validates :year, numericality: { only_integer: true}
  validates :year, numericality: { greater_than: 1930 }
  validates :year, numericality: { less_than: 2024 }

end
