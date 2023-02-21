class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :dealer, null: false, foreign_key: true
      t.integer :year
      t.string :make
      t.string :model

      t.timestamps
    end
  end
end
