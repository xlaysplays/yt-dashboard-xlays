// 🔁 Tab switching
function showTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[onclick="showTab('${id}')"]`).classList.add('active');
}

// 🧪 Replace this with your real API key
const API_KEY = 'YOUR_YOUTUBE_API_KEY';
const CHANNEL_ID = 'YOUR_CHANNEL_ID'; // Get it from your YouTube channel URL

// 📊 Example chart
const ctx = document.getElementById('viewsChart').getContext('2d');
let viewsChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Views',
      data: [120, 190, 300, 500, 400],
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderColor: '#8b5cf6',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

// 📥 Load videos from your channel
async function loadVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`;

  const res = await fetch(url);
  const data = await res.json();

  const videoList = document.getElementById('videoList');
  videoList.innerHTML = '';

  data.items.forEach(item => {
    if (item.id.kind === 'youtube#video') {
      const li = document.createElement('li');
      li.innerHTML = `
        🎬 <strong>${item.snippet.title}</strong><br>
        📅 ${new Date(item.snippet.publishedAt).toLocaleDateString()}
      `;
      videoList.appendChild(li);
    }
  });
}

loadVideos();
             
