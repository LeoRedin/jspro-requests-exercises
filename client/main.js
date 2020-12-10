const url = 'http://localhost:3000'
const postsContainer = document.getElementById('posts')

const appState = {
  users: [],
  posts: [],
  comments: [],
}

function getUserById(id) {
  const {users} = appState

  let userName = 'Sem autor'

  users.forEach((usuario) => {
    if (id === usuario.id) userName = usuario.name
  })

  return userName
}

function criarMarcacao(post) {
  const {title, body, userId} = post

  const userName = getUserById(userId)

  return `
    <div class="container">
      <div class="post-title">
        ${title}
      </div>
      <div class="post-body">
        ${body}
      </div>
      <div class="post-author">
        ${userName}
      </div>
    </div>
  `
}

function createApp() {
  const {users, posts} = appState

  if (users.length && posts.length) {
    let marcacaoFinal = ''

    posts.forEach((post) => (marcacaoFinal += criarMarcacao(post)))

    postsContainer.innerHTML = marcacaoFinal
  }
}

fetch(`${url}/posts`)
  .then((resposta) => resposta.json())
  .then((posts) => {
    const postsSelecionados = posts.slice(0, 10)
    appState.posts = postsSelecionados
    createApp()
  })

fetch(`${url}/users`)
  .then((resposta) => resposta.json())
  .then((usuarios) => {
    appState.users = usuarios
    createApp()
  })

fetch(`${url}/comments`)
  .then((resposta) => resposta.json())
  .then((comentarios) => {
    appState.comments = comentarios
    createApp()
  })
