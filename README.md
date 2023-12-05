# ⚔️ Desafio Escribo 2 - Back-End
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
----
### SOBRE
#### Deploy feito em [Render](render).
#### No Sistema podemos ter Sign Up(Criação de Cadastro), Sign In(Autenticação), Buscar Usuário.
#### Framework Express, JWT, jsHint, jsLint
----
### GET e POST
[Post](postSignUp) -> https://desafioescribo.onrender.com/signup <br>
[Post](postSignIn) -> https://desafioescribo.onrender.com/signin <br>
[Get](getUser) -> https://desafioescribo.onrender.com/user
----

### JSON Sign Up <br>

{ <br>

  "nome": "SeuNome", <br>
  "email": "seuemail@example.com", <br>
  "senha": "suaSenha", <br>
  "telefone": [{"numero": "123456789", "ddd": "11"}] <br>
  
}

### JSON Sign In <br>

{ <br>

  "email": "seuemail@example.com", <br>
  "senha": "suaSenha" <br>
  
} <br>

### JSON User <br>

{ <br>

   jwt Token <br>
   // Gerado no SIGN UP (post) <br>
   
} <br>
----
