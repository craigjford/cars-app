class CarSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model

  belongs_to :dealer
end
