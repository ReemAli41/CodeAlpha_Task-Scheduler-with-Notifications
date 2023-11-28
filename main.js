function scheduleTask() {
    const taskInput = document.getElementById('task');
    const deadlineInput = document.getElementById('deadline');
    const soundInput = document.getElementById('sound');
    const taskList = document.getElementById('taskList');

    const task = taskInput.value;
    const deadline = new Date(deadlineInput.value).toLocaleString();
    const sound = soundInput.files[0];

    if (task && deadline) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${task}</strong> - ${deadline} 
                              <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(listItem);

        const now = new Date();
        const taskTime = new Date(deadlineInput.value);
        const timeDifference = taskTime - now;
        if (timeDifference > 0) {
            setTimeout(() => {
                if ('Notification' in window && 'Audio' in window) {
                    // Request permission to show notifications
                    Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                            const notification = new Notification('Task Reminder', {
                                body: `${task} - ${deadline}`,
                            });

                            // Play a notification sound if specified, otherwise play a default sound
                            const audio = new Audio(sound ? URL.createObjectURL(sound) : 'notification.mp3');
                            audio.play();

                            alert(`Task Reminder: ${task} - ${deadline}`);

                            // Close the notification after 5 seconds
                            setTimeout(() => {
                                notification.close();
                            }, 5000);
                        }
                    });
                }
            }, timeDifference);
        } else {
            alert('Please enter a future deadline for the task.');
        }
    } else {
        alert('Please enter both task and deadline.');
    }

    
    taskInput.value = '';
    deadlineInput.value = '';
    soundInput.value = ''; 
}

function deleteTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
}
