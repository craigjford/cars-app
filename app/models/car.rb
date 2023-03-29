class Car < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  has_many :repairs, dependent: :destroy

  validates :year, :make, :model, presence: true
  validates :year, length: { is: 4 }
  validates :year, numericality: { only_integer: true}
  validates :year, numericality: { greater_than: 1930 }

end
