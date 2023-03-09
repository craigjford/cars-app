class CarSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model

  belongs_to :dealer
  has_many :repairs
end
