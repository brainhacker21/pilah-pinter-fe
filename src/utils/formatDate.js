const formatDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default formatDate
