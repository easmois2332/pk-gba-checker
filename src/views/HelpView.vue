<script setup>
</script>

<template>
  <div class="content-area">
    <v-card class="mb-4" title="本サイトについて">
      <v-card-text>
        <span>
          GBAチェッカーは第三世代のポケモンの情報を確認できるツールです。<br>
          本サイトによって受けた損害については一切の責任を負いません。<br>
          使用している画像の著作権は権利者様へ帰属します。また、権利者様側からの画像等の削除の依頼、警告には速やかに対処いたします。
        </span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="連絡先">
      <v-card-text>
        <a href="https://x.com/cs32kiy" target="_blank">@cs32kiy</a><span>(X)</span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="推奨環境">
      <v-card-text>
        <span>
          Google Chrome ブラウザ
        </span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="機能説明">
      <v-card-text>
        <div class="mb-4">
          <span class="font-bold"><v-icon class="mr-2" icon="mdi-book-open-page-variant"></v-icon>ポケモン図鑑</span><br>
          <span>
            ポケモンのステータスや覚えるわざなどの情報を確認できます。<br>
            ポケモン一覧のヘッダーをクリック・タップすることでポケモン一覧の内容をソートすることができます。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold"><v-icon class="mr-2" icon="mdi-checkbox-multiple-marked"></v-icon>レギュチェッカー</span><br>
          <span>
            ポケモンと覚えているわざを入力し、指定したレギュレーションで使用することができるポケモンかの確認ができます。<br>
            入力ボックスにワードを入力するとワードに部分一致するポケモン、わざが抽出されます。<br>
            レギュレーションは比較的メジャーなルールを選択できるように設定してあります。<br>
            カスタムからはレギュレーションを自由に設定することができます。設定されていないレギュレーションを設定したい場合にご使用ください。
          </span>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="更新履歴">
      <v-card-text>
        <div>
          <span class="font-bold">v1.0.0</span><br>
          <span>
            リリース
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
