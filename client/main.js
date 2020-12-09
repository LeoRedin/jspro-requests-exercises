const url = 'http://localhost:3000'
const postsContainer = document.getElementById('posts')

function criarMarcacao(post) {
  // const {title, body, userId} = post
  return `
    <div class="container">
      <div class="post-title">
        ${post.title}
      </div>
      <div class="post-body">
        ${post.body}
      </div>
      <div class="post-author">
        ${post.userId}
      </div>
    </div>
  `
}

fetch(`${url}/posts`)
  .then((resposta) => resposta.json())
  .then((posts) => {
    const primeirosDez = posts.slice(0, 10)
    let marcacaoFinal = ''

    primeirosDez.forEach((post) => (marcacaoFinal += criarMarcacao(post)))

    postsContainer.innerHTML = marcacaoFinal
  })
