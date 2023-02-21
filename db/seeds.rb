# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Starting....";


d1 = Dealer.create!(name: "DCH Honda", contact: "Al Colquitt", phone: "7326712550", email: "alc@honda.com");
d2 = Dealer.create!(name: "FJK Volkswagen", contact: "Jeff Egle", phone: "7326713330", email: "jegle@vw.com");
d2 = Dealer.create!(name: "Preferred Motors", contact: "Pat Jackson", phone: "9084503556", email: "pjackson@preferred.com");
d2 = Dealer.create!(name: "JG Motors", contact: "John Grommesh", phone: "2015467234", email: "grommesh@rapid.com");
d2 = Dealer.create!(name: "Schwartz Mazda", contact: "Tom Och", phone: "6468590461", email: "toch@sch_mazda.com");
d2 = Dealer.create!(name: "Baja Motors", contact: "Bryan Knotts", phone: "6095288443", email: "b_knotts@baja.com");

puts "Dealers done";