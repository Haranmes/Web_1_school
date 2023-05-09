document.getElementById("form1").addEventListener('submit', async function(event) {
    event.preventDefault();
    let prompt = document.getElementById("prompt")
    prompt.value
    console.log(prompt.value)
    const resp = await fetch(
        `https://api.edenai.run/v2/image/generation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmU2YTAxODYtNmE4Yi00MzQyLTgxMDItYzRiMDA5YmMyYjAwIiwidHlwZSI6ImFwaV90b2tlbiJ9.JyHlqsHfSHcSjolBJfoVeWeiTWM2aCBN7zNgMUl-6h4'
          },
          body: JSON.stringify({
            providers: 'stabilityai,openai,deepai',
            text: prompt.value,
            resolution: '512x512',
            num_images: 2
          })
        }
      );
      
      const data = await resp.json();
      document.getElementById("Dall_img").src=data.openai.items[1].image_resource_url
      console.log(data);
});







