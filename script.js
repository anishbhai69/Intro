document.getElementById('proForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // ***************************************************************
    // 🛑 [গুরুত্বপূর্ণ] নিচে YOUR_DISCORD_WEBHOOK_URL_HERE এর জায়গায় 
    // আপনার আসল Discord Webhook URL টি বসান।
    // ***************************************************************
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1443530140075425823/k6ufTUX9NSBDQGye4qc58qpYU5KCB3_7huZNYlnt31jvvjPOGXpRWxKfxfOiu9CNJFBx'; 

    const nameInput = document.getElementById('name');
    const skillInput = document.getElementById('skill');
    const discordIdInput = document.getElementById('discord_id');
    const message = document.getElementById('message');

    let isValid = true;
    
    // রিসেট ও ভ্যালিডেশন
    [nameInput, skillInput, discordIdInput].forEach(input => input.classList.remove('error'));
    message.classList.remove('show');

    if (nameInput.value.trim() === '') { nameInput.classList.add('error'); isValid = false; }
    if (skillInput.value.trim() === '') { skillInput.classList.add('error'); isValid = false; }
    if (discordIdInput.value.trim() === '') { discordIdInput.classList.add('error'); isValid = false; }


    if (isValid) {
        const discordId = discordIdInput.value.trim();
        
        // ফর্মের ডেটা সংগ্রহ (এখন সব ইনপুট থেকে আসছে)
        const formData = {
            '👤 Name': nameInput.value,
            '🤖 Discord ID': discordId,
            '🎂 Age': document.getElementById('age').value || 'N/A',
            '🚻 Gender': document.getElementById('gender').value || 'N/A', // এখন ইনপুট
            '📏 Height': document.getElementById('height').value || 'N/A',
            '📍 Location': document.getElementById('location').value || 'N/A',
            '✉️ DM Status': document.getElementById('dm_status').value || 'N/A', // এখন ইনপুট
            '❤️ Relationship': document.getElementById('relationship').value || 'N/A', // এখন ইনপুট
            '🎶 Hobbies': document.getElementById('hobbies').value || 'N/A',
            '💡 Skill': skillInput.value,
            '📝 About': document.getElementById('about').value || 'N/A',
        };

        // Discord Embeds এবং Mention সহ মেসেজ তৈরি করা
        const webhookMessage = {
            content: `<@${discordId}>Thinks for upload your intro !`,
            
            embeds: [{
                title: "✨  New member intro",
                color: 5814783, 
                fields: Object.keys(formData).map(key => ({
                    name: `**${key}**`,
                    value: formData[key],
                    inline: (key !== '📝 নিজের সম্পর্কে' && key !== '🎶 হবি / আগ্রহ' && key !== '📍 কোথায় থাকো'), 
                })),
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Thanks for the intro',
                }
            }]
        };

        // Webhook এ ডেটা পাঠানো
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookMessage),
        })
        .then(response => {
            if (response.ok) {
                message.textContent = '✅ Form successfully sent to Discord.ছে!';
                message.style.color = 'var(--success-color)';
                message.classList.add('show'); 
                // form.reset();
            } else {
                message.textContent = `❌ ডেটা পাঠাতে ব্যর্থ: ${response.status} ত্রুটি। Webhook URL চেক করুন।`;
                message.style.color = 'var(--error-color)';
                message.classList.add('show');
            }
        })
        .catch(error => {
            message.textContent = `❌ নেটওয়ার্ক ত্রুটি: ডেটা পাঠানো যায়নি।`;
            message.style.color = 'var(--error-color)';
            message.classList.add('show');
            console.error('Webhook Error:', error);
        });

    } else {
        // ভ্যালিডেশন ব্যর্থ হলে ত্রুটি বার্তা
        message.textContent = '❌  Please fill in the fields marked *.';
        message.style.color = 'var(--error-color)';
        message.classList.add('show');
    }
});
