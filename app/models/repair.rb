class Repair < ApplicationRecord
  belongs_to :car

  validates :cost, :service_desc, :shop_name, presence: true
  validates :cost, numericality: { greater_than: 0 }
  validates :cost, numericality: { only_integer: true }

end
