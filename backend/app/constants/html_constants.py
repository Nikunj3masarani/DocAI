
INVITE_USER = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DocAI Invitation</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Invitation to DocAI Platform</h2>
        <p>Hello,</p>
        <p>You've been invited to join the DocAI platform. DocAI helps in automating document processing tasks, making your workflow more efficient.</p>
        <p>To get started, click the button below:</p>
        <a href={url} style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Join DocAI</a>
        <p>If the button above doesn't work, you can also <a href={url}>click here</a> to join.</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Best regards,<br>{name}</p>
    </div>
</body>
</html>"""


FORGOT_PASSWORD ="""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. If you did not make this request, you can ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href={url} style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you're having trouble clicking the button above, you can also <a href={url}>click here</a> to reset your password.</p>
        <p>This link is valid for a limited time. If you do not reset your password within this time frame, you may need to submit another request.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Best regards,<br>{name}</p>
    </div>
</body>
</html>
"""


INDEX_INVITE_USER = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation to Join Brain</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Invitation to Join Brain</h2>
        <p>Hello,</p>
        <p>You've been invited to join Brain, a platform for collaborative thinking and problem-solving.</p>
        <p>Join Brain to:</p>
        <p>To get started, click the button below:</p>
        <a href={url} style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Join Brain</a>
        <p>If the button above doesn't work, you can also <a href={url}>click here</a> to join.</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Best regards,<br>{name}</p>
    </div>
</body>
</html>
"""