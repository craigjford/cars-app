class CarSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :dealer_id, :year, :make, :model 

  belongs_to :dealer
  has_many :repairs

end
