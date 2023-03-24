class DealerSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact, :phone, :email  #, :user_cars

  has_many :cars

#  def user_cars
#     self.object.cars.each_with_object({}) do |car|
#         if car.user_id = 1
#             return car
#         end
#     end
#   end 

end
