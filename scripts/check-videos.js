const fs = require('fs');
const path = require('path');

// Chemins relatifs à la racine du projet
const PUBLIC_DIR = path.join(__dirname, '../public');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');

// Noms de fichiers attendus
const EXPECTED_VIDEOS = ['hero-1.mp4', 'hero-2.mp4', 'hero-3.mp4'];

console.log('🔍 Vérification des vidéos pour le Hero...');

// Vérifier si le dossier public existe
if (!fs.existsSync(PUBLIC_DIR)) {
  console.log('❌ Le dossier public n\'existe pas!');
  console.log(`   Chemin recherché: ${PUBLIC_DIR}`);
  console.log('   Création du dossier public...');
  try {
    fs.mkdirSync(PUBLIC_DIR);
    console.log('✅ Dossier public créé avec succès!');
  } catch (err) {
    console.error('❌ Erreur lors de la création du dossier public:', err);
    process.exit(1);
  }
}

// Vérifier si le dossier videos existe
if (!fs.existsSync(VIDEOS_DIR)) {
  console.log('❌ Le dossier videos n\'existe pas!');
  console.log(`   Chemin recherché: ${VIDEOS_DIR}`);
  console.log('   Création du dossier videos...');
  try {
    fs.mkdirSync(VIDEOS_DIR);
    console.log('✅ Dossier videos créé avec succès!');
  } catch (err) {
    console.error('❌ Erreur lors de la création du dossier videos:', err);
    process.exit(1);
  }
}

// Vérifier les vidéos
let missingVideos = [];
let existingVideos = [];

EXPECTED_VIDEOS.forEach(videoFile => {
  const videoPath = path.join(VIDEOS_DIR, videoFile);
  if (fs.existsSync(videoPath)) {
    existingVideos.push(videoFile);
    const stats = fs.statSync(videoPath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    console.log(`✅ La vidéo ${videoFile} existe (${fileSizeInMB.toFixed(2)} MB)`);
  } else {
    missingVideos.push(videoFile);
    console.log(`❌ La vidéo ${videoFile} est MANQUANTE!`);
  }
});

// Résumé
console.log('\n📊 RÉSUMÉ:');
console.log(`   - ${existingVideos.length} vidéos trouvées`);
console.log(`   - ${missingVideos.length} vidéos manquantes`);

if (missingVideos.length > 0) {
  console.log('\n⚠️ ATTENTION: Des vidéos sont manquantes!\n');
  console.log('Pour que le Hero fonctionne correctement, veuillez:');
  console.log('1. Placer les fichiers vidéo suivants dans le dossier public/videos:');
  missingVideos.forEach(video => {
    console.log(`   - ${video}`);
  });
  console.log('\n2. Ou modifier le composant Hero.jsx pour utiliser des vidéos alternatives.');
  console.log('\nVous pouvez aussi tester les vidéos dans le navigateur:');
  console.log('- Lancez le serveur de développement avec "npm start"');
  console.log('- Accédez à http://localhost:3000/test-video.html');
} else {
  console.log('\n✅ PARFAIT! Toutes les vidéos sont présentes.');
  console.log('Le composant Hero devrait fonctionner correctement.');
  console.log('\nVous pouvez tester les vidéos dans le navigateur:');
  console.log('- Lancez le serveur de développement avec "npm start"');
  console.log('- Accédez à http://localhost:3000/test-video.html');
}

// Vérifier si le dossier de scripts existe
const SCRIPTS_DIR = path.dirname(__dirname);
if (fs.existsSync(SCRIPTS_DIR)) {
  console.log('\n✨ Scripts trouvés dans:', SCRIPTS_DIR);
}

// Afficher les chemins absolus pour aider au débogage
console.log('\n🔍 INFORMATIONS DE CHEMIN:');
console.log(`Répertoire de travail actuel: ${process.cwd()}`);
console.log(`Chemin absolu du dossier public: ${PUBLIC_DIR}`);
console.log(`Chemin absolu du dossier videos: ${VIDEOS_DIR}`);

console.log('\n💡 CONSEIL: Si vous avez des problèmes avec les chemins de fichiers,');
console.log('             assurez-vous d\'exécuter ce script depuis la racine du projet.'); 