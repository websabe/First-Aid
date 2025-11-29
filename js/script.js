// كود الأنشطة والأسئلة
document.addEventListener('DOMContentLoaded', function() {
    // إذا كنا في صفحة الأنشطة
    if (document.querySelector('.quiz-container')) {
        initializeQuiz();
    }
    
    // إضافة تأثيرات تفاعلية للبطاقات
    const cards = document.querySelectorAll('.card, .topic-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

function initializeQuiz() {
    const questions = [
        {
            question: "ماذا تفعل إذا جرح صديقك؟",
            options: [
                "أتركه وحده",
                "أنظف الجرح بالماء ثم أضع عليه ضمادة",
                "أضع الثلج مباشرة على الجرح"
            ],
            correct: 1
        },
        {
            question: "إذا احترق شخص، ما هو أول شيء يجب فعله؟",
            options: [
                "أضع الزيت على الحرق",
                "أضع الثلج مباشرة على الحرق",
                "أضع المنطقة المحروقة تحت ماء بارد لمدة 10 دقائق"
            ],
            correct: 2
        },
        {
            question: "إذا كان أنف شخص ينزف، ماذا تفعل؟",
            options: [
                "أجعله يميل رأسه للخلف",
                "أجعله يميل رأسه للأمام وأضغط على أنفه",
                "أضع قطعة قطن في أنفه"
            ],
            correct: 1
        },
        {
            question: "إذا صعق شخص بالكهرباء، ما هو أول إجراء؟",
            options: [
                "أمسكه لأبعده عن مصدر الكهرباء",
                "أفصل مصدر الكهرباء أولاً",
                "أصب عليه الماء"
            ],
            correct: 1
        },
        {
            question: "إذا كان شخص يختنق ولا يستطيع الكلام، ماذا تفعل؟",
            options: [
                "أصفع ظهره بقوة",
                "أعطيه الماء",
                "أقوم بضربات على الظهر والضغط على البطن (مناورة هيمليك)"
            ],
            correct: 2
        },
        {
            question: "ما هو رقم الطوارئ في بلدك؟",
            options: [
                "911",
                "112",
                "998"
            ],
            correct: 2
        },
        {
            question: "إذا سقط شخص وأصيب، ماذا تفعل أولاً؟",
            options: [
                "أحركه فوراً",
                "أتأكد من أنه يتنفس وأطلب المساعدة",
                "أعطيه طعاماً أو شراباً"
            ],
            correct: 1
        },
        {
            question: "كيف تتعامل مع كسر في العظام؟",
            options: [
                "أحاول تقويم العظمة",
                "أثبت المنطقة المصابة وأطلب المساعدة الطبية",
                "أضع مرهم على المنطقة"
            ],
            correct: 1
        },
        {
            question: "إذا تعرض شخص للدغة نحلة، ماذا تفعل؟",
            options: [
                "أضغط على المنطقة لإخراج السم",
                "أستخدم ملقط لإزالة الإبرة ثم أغسل المنطقة",
                "أتركها ولا أفعل شيئاً"
            ],
            correct: 1
        },
        {
            question: "ما هو الشيء الذي يجب أن يكون في حقيبة الإسعافات الأولية؟",
            options: [
                "الحلوى",
                "الضمادات واللاصق الطبي",
                "الألعاب"
            ],
            correct: 1
        }
    ];

    const quizContainer = document.querySelector('.quiz-container');
    const submitBtn = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('result');
    
    // إنشاء واجهة الأسئلة
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `سؤال ${index + 1}: ${q.question}`;
        questionDiv.appendChild(questionTitle);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        q.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.index = optIndex;
            optionDiv.dataset.question = index;
            
            const optionNumber = document.createElement('div');
            optionNumber.className = 'option-number';
            optionNumber.textContent = String.fromCharCode(1632 + optIndex + 1); // أرقام عربية
            
            const optionText = document.createElement('span');
            optionText.textContent = option;
            
            optionDiv.appendChild(optionNumber);
            optionDiv.appendChild(optionText);
            
            optionDiv.addEventListener('click', function() {
                // إزالة التحديد من جميع الخيارات في هذا السؤال
                const allOptions = optionsDiv.querySelectorAll('.option');
                allOptions.forEach(opt => opt.classList.remove('selected'));
                
                // تحديد الخيار المختار
                this.classList.add('selected');
                
                // حفظ الإجابة
                questions[index].userAnswer = optIndex;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContainer.insertBefore(questionDiv, submitBtn.parentElement);
    });
    
    // معالجة تقديم الإجابات
    submitBtn.addEventListener('click', function() {
        let score = 0;
        let allAnswered = true;
        
        questions.forEach((q, index) => {
            if (q.userAnswer === undefined) {
                allAnswered = false;
                return;
            }
            
            if (q.userAnswer === q.correct) {
                score++;
            }
        });
        
        if (!allAnswered) {
            alert('⚠️ من فضلك أجب على جميع الأسئلة قبل التقديم!');
            return;
        }
        
        // عرض النتيجة
        resultDiv.style.display = 'block';
        resultDiv.className = 'result';
        
        const percentage = (score / questions.length) * 100;
        
        if (percentage >= 80) {
            resultDiv.classList.add('good');
            resultDiv.innerHTML = `
                <div class="result-icon">🎉</div>
                <h3>ممتاز! أنت بطل الإسعافات الأولية! 🦸</h3>
                <p>لقد أجبت بشكل صحيح على ${score} من أصل ${questions.length} أسئلة.</p>
                <p>مستواك رائع وتستطيع مساعدة الآخرين في حالات الطوارئ!</p>
            `;
        } else if (percentage >= 60) {
            resultDiv.classList.add('average');
            resultDiv.innerHTML = `
                <div class="result-icon">👍</div>
                <h3>جيد جداً! 🔥</h3>
                <p>لقد أجبت بشكل صحيح على ${score} من أصل ${questions.length} أسئلة.</p>
                <p>استمر في التعلم لتصبح خبيراً في الإسعافات الأولية!</p>
            `;
        } else {
            resultDiv.classList.add('poor');
            resultDiv.innerHTML = `
                <div class="result-icon">💪</div>
                <h3>حاول مرة أخرى! 🌟</h3>
                <p>لقد أجبت بشكل صحيح على ${score} من أصل ${questions.length} أسئلة.</p>
                <p>لا تيأس، استمر في التعلم وحاول مرة أخرى!</p>
            `;
        }
        
        // تمرير النتيجة إلى الأعلى
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
        // تعطيل الزر بعد التقديم
        submitBtn.disabled = true;
        submitBtn.textContent = 'تم التقديم ✓';
    });
}