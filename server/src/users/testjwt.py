import jwt

encode_jwt = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')
encode2_jwt = jwt.encode({'some': 'payload'}, 'secret', headers={"kid": "230498151c214b788dd97f22b85410a5"}, algorithm='HS256')

jwt_decode = jwt.decode(encode_jwt, 'secret', algorithms=['HS256'])
print(jwt_decode)
print(encode_jwt)
print(encode_jwt == encode2_jwt)
