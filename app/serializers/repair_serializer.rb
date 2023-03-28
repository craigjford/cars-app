class RepairSerializer < ActiveModel::Serializer
  attributes :id, :car_id, :shop_name, :cost, :service_desc, :car
  belongs_to :car
end
