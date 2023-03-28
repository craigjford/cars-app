class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name #, :dealers_with_cars 

  # has_many :cars
  # has_many :dealers, through: :cars
  # has_many :repairs, through: :cars  

  # def dealers_with_cars
  #   self.object.dealers.map do |dealer|
  #      d = {}
  #      d[:id] = dealer.id
  #      d[:name] = dealer.name
  #      d[:contact] = dealer.contact
  #      d[:phone] = dealer.phone
  #      d[:email] = dealer.email
  #      d[:cars] = dealer.cars.select {|car| car.user_id == self.object.id}
  #      d[:cars] = dc
  #      d.cars = dc
  #      d
  #   end
  # end

end
