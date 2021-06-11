<template>
  <div>

    <q-drawer show-if-above behavior="desktop" side="left" bordered :width="120">
      <q-list>
        <q-item v-ripple clickable :to="{ name: 'MyList'}" style="color: black;">
          <q-item-section>
            <q-item-label>Повернутися до списку</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page>
      <router-view />
    </q-page>

  </div>
</template>
