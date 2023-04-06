class DealerCarSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact, :phone, :email, :cars
  
  def cars
    myCars = self.object.cars.select {|c| c.user.id == self.scope.id}
  end
  
end
