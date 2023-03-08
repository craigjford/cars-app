class DealerSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact, :phone, :email

  has_many :cars
end
