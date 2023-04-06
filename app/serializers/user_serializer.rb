class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :dealers_with_cars 

  def dealers_with_cars
     self.object.dealers.map do |dealer|
        dlr = {}
        dlr[:id] = dealer.id
        dlr[:name] = dealer.name
        dlr[:contact] = dealer.contact
        dlr[:phone] = dealer.phone
        dlr[:email] = dealer.email
        dlr[:cars] = dealer.cars.select {|car| car.user_id == self.object.id}
        dlr
     end  
  end

end







