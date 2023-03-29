class DealerCarSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact, :phone, :email, :cars

  # has_many :cars
  
    def cars
      myCars = self.object.cars.select {|c| c.user.id == self.scope.id}
    end

    # def dealers_with_cars
    #   self.object.dealers.map do |dealer|
    #     d = {}
    #     d[:id] = dealer.id
    #     d[:name] = dealer.name
    #     d[:contact] = dealer.contact
    #     d[:phone] = dealer.phone
    #     d[:email] = dealer.email
    #     d[:cars] = dealer.cars.select {|car| car.user_id == self.object.id}
    #     #  d[:cars] = dc
    #     #  d.cars = dc
    #     d
    #   end
    # end
  
end
