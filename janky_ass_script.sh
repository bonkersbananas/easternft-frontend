npm run build
cp public/build/bundle.js ../casper2.4/assets/js/nft.js
cp public/build/bundle.css ../casper2.4/assets/css/nft-svelte.css
cp public/global.css ../casper2.4/assets/css/nft.css

cwd=$(pwd)
cd ../casper2.4
npm run zip
mv dist/casper.zip dist/casper2.5.zip
cd $cwd