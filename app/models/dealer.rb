class Dealer < ApplicationRecord
    has_many :cars
    has_many :users, through: :cars

    validates :name, :contact, :phone, :email, presence: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}

end
