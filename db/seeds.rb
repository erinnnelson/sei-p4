user01 = User.create(username: 'kalaven', email: 'kalaven@gmail.com', password: 'password')
user02 = User.create(username: 'seth11', email: 'seth11@aol.com', password: 'password')
user03 = User.create(username: 'profg', email: 'ericpandrews@gmail.com', password: 'password')
user04 = User.create(username: 'sinbad7', email: 's2777@yahoo.com', password: 'password')
user05 = User.create(username: 'bartfan', email: 'richhenryson@gmail.com', password: 'password')
user06 = User.create(username: 'neverblue82', email: 'neverblue82@gmail.com', password: 'password')
user07 = User.create(username: 'thesixler', email: 'thesixler@gmail.com', password: 'password')
user08 = User.create(username: 'thundershirt', email: 'jvandiveer@gmail.com', password: 'password')
user09 = User.create(username: 'rachie88', email: 'haislip@gmail.com', password: 'password')
user10 = User.create(username: 'peachypie', email: 'peachypie@icloud.com', password: 'password')
user11 = User.create(username: 'hamstermom', email: 'hamstarmo@yahoo.com', password: 'password')
user12 = User.create(username: 'lacesohoolihan', email: 'scottieb@ymail.com', password: 'password')
user13 = User.create(username: 'risaspisas', email: 'risagriffin@gmail.com', password: 'password')
user14 = User.create(username: 'lilst3vie', email: 'lilst3vie@gmail.com', password: 'password')
user15 = User.create(username: 'will', email: 'willdgouda@gmail.com', password: 'password')
user16 = User.create(username: 'ugottabkittenme', email: 'kittyfluff@aol.com', password: 'password')
user17 = User.create(username: 'lonelyland', email: 'iamalliam@icloud.com', password: 'password')
user18 = User.create(username: 'kitboga', email: 'kitboga@gmail.com', password: 'password')
user19 = User.create(username: 'pjverica', email: 'pamelajverica@icloud.com', password: 'password')
user20 = User.create(username: 'djmankoweitz', email: 'djmankoweitz@gmail.com', password: 'password')

Poll.create(title: "best ice cream", open: 'true', user_id: 1)
choice01 = Choice.create(name:"chocolate", option_position: 1, poll_id: 1)
choice02 = Choice.create(name:"vanilla", option_position: 2, poll_id: 1)
choice03 = Choice.create(name:"strawberry", option_position: 3, poll_id: 1)
choice04 = Choice.create(name:'mint', option_position: 4, poll_id: 1)
choice05 = Choice.create(name:'other', option_position: 5, poll_id: 1)

Poll.create(title: 'are pants overrated', open: 'false', user_id: 1)
choice06 = Choice.create(name:'yes', option_position: 1, poll_id: 2)
choice07 = Choice.create(name:'no', option_position: 2, poll_id: 2)

Poll.create(title: 'who would win in a fight', open: 'true', user_id: 1)
choice08 = Choice.create(name:'Mario', option_position: 1, poll_id: 3)
choice09 = Choice.create(name:'Sonic', option_position: 2, poll_id: 3)
choice10 = Choice.create(name:'Megaman', option_position: 3, poll_id: 3)

Poll.create(title: 'Day Trip Poll', open: 'true', user_id: 2)
choice11 = Choice.create(name:'Movie', option_position: 1, poll_id: 4)
choice12 = Choice.create(name:'Theme Park', option_position: 2, poll_id: 4)

Poll.create(title: 'Which Batman is the GOAT', open: 'true', user_id: 3)
choice13 = Choice.create(name:'Keaton',option_position: 1, poll_id: 5)
choice14 = Choice.create(name:'Bale',option_position: 2, poll_id: 5)
choice15 = Choice.create(name:'Affleck',option_position: 3, poll_id: 5)
choice16 = Choice.create(name:'West',option_position: 4, poll_id: 5)
choice17 = Choice.create(name:'Clooney',option_position: 5, poll_id: 5)
choice18 = Choice.create(name:'Kilmer',option_position: 6, poll_id: 5)

Poll.create(title: 'Which Joker is the GOAT', open: 'true', user_id: 3)
choice19 = Choice.create(name:'Nicholson',option_position: 1, poll_id: 6)
choice20 = Choice.create(name:'Ledger',option_position: 2, poll_id: 6)
choice21 = Choice.create(name:'Hamill',option_position: 3, poll_id: 6)
choice22 = Choice.create(name:'Leto',option_position: 4, poll_id: 6)

Poll.create(title: 'Would you rather...', open: 'false', user_id: 4)
choice23 = Choice.create(name:'Fight 1 horse sized duck',option_position: 1, poll_id: 7)
choice24 = Choice.create(name:'fight 100 duck sized horses',option_position: 2, poll_id: 7)

Poll.create(title: "what is next months focus?", open: 'true', user_id: 6)
choice25 = Choice.create(name:'beat the competition to market',option_position: 1, poll_id: 8)
choice26 = Choice.create(name:'earnings over interest',option_position: 2, poll_id: 8)
choice27 = Choice.create(name:'capitalize on momentum',option_position: 3, poll_id: 8)

Poll.create(title: 'Is it time yet?', open: 'false', user_id: 9)
choice28 = Choice.create(name:'sure',option_position: 1, poll_id: 9)
choice29 = Choice.create(name:'what',option_position: 2, poll_id: 9)
choice30 = Choice.create(name:'stop',option_position: 3, poll_id: 9)

Poll.create(title: 'choose one', open: 'true', user_id: 10)
choice31 = Choice.create(name:'mustard',option_position: 1, poll_id: 10)
choice32 = Choice.create(name:'ketchup',option_position: 2, poll_id: 10)
choice33 = Choice.create(name:'mayonaise',option_position: 3, poll_id: 10)
choice34 = Choice.create(name:'a million dollars',option_position: 4, poll_id: 10)

Poll.create(title: 'Which season of stranger things is overall the best so far?', open: 'true', user_id: 12)
choice35 = Choice.create(name:'Season 1',option_position: 1, poll_id: 11)
choice36 = Choice.create(name:'Season 2',option_position: 2, poll_id: 11)
choice37 = Choice.create(name:'Season 3',option_position: 3, poll_id: 11)

user01.choices.push(choice16, choice22, choice30, choice35)
user02.choices.push(choice04, choice14, choice27, choice36)
user03.choices.push(choice01, choice13, choice21, choice26, choice34)
user04.choices.push(choice02, choice27, choice28, choice34, choice35)
user05.choices.push(choice03, choice22, choice26, choice37)
user06.choices.push(choice02, choice06, choice08, choice17)
user07.choices.push(choice04, choice27, choice30, choice35)
user08.choices.push(choice05, choice07, choice18, choice25)
user09.choices.push(choice03, choice06, choice13, choice28, choice34)
user10.choices.push(choice03, choice14, choice19, choice27, choice37)
user11.choices.push(choice04, choice17, choice27, choice36)
user12.choices.push(choice03, choice30, choice32, choice35)
user13.choices.push(choice02, choice09, choice17, choice20, choice35)
user14.choices.push(choice04, choice16, choice27, choice30, choice37)
user15.choices.push(choice04, choice13, choice19, choice25, choice34)
user16.choices.push(choice03, choice10, choice21, choice26, choice35)
user17.choices.push(choice02, choice14, choice20, choice26, choice30)
user18.choices.push(choice01, choice13, choice25, choice30, choice35)
user19.choices.push(choice03, choice14, choice26, choice30, choice37)
user20.choices.push(choice03, choice07, choice13, choice20, choice25, choice34)