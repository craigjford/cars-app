class RepairAllSerializer < ActiveModel::Serializer
  attributes :id, :car_id, :shop_name, :cost, :service_desc

  belongs_to :car
end
