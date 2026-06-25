<template>
  <header class="app-header">
    <nav class="container nav">
      <router-link to="/" class="nav-brand">AI Shop</router-link>
      <div class="nav-links">
        <router-link to="/">상품 목록</router-link>
        <router-link to="/admin">관리자</router-link>
        <router-link to="/ai-demo">AI 데모</router-link>
      </div>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
.app-header {
  background: var(--color-primary);
  color: #fff;
  padding: 12px 0;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-brand {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 16px;
}
.nav-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fff;
  text-decoration: underline;
}
</style>
