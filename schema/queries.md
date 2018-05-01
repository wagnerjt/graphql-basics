```
# {
#   user(id: "40") {
#     id
#     firstName
#     age
#     company {
#       id
#       name
#       description
#     }
#   }
# }

# {
#   company(id: "2") {
# 		id
#     name
#     description
#   }
# }

# Named queries
# query findCompany {
#   company(id: "2") {
#     id
#     name
#     description
#     users {
#       id
#       firstName
# 			age
#       company {
#         name
#         users {
#           age
#         }
#       }
#     }
#   }
# }

# Naming Query Value pairs
# {
#   apple:company(id:"1"){
#     id
#     name
#     description
#   }
#   google: company(id: "2"){
#     id
#     name
#     description
#   }
# }

# Query Fragments, for naming returned data
# fragment companyDetails on Company {
#   id
#   name
#   description
# }

# {
#   apple: company(id: "1") {
#     ...companyDetails
#   }
# }

# AddUser mutation
mutation {
	addUser(firstName: "tyler",
    age: 24) {
    id
    firstName
    age
  }
}

```