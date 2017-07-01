from flask import Flask, render_template, request, url_for, redirect, session, escape
import datahandler

app = Flask(__name__, static_url_path='/static')
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.route('/')
def root():
    message = "You are not signed in yet"
    if 'username' in session:
        message = "Signed in as " + session['username']
        return render_template('index.html', message=message)
    return render_template('index.html', message=message)


@app.route('/register')
def render_registration_page():
    return render_template('registration.html', eventURL='/register-user')


@app.route('/register-user', methods=["POST"])
def register_user():
    username = request.form['username']
    password = request.form['password']
    if datahandler.insert_user(username, password):
        session['username'] = username
        return redirect(url_for('root'))

    else:
        return render_template('registration.html', eventURL='/register-user', error_message="Username already exists!")


@app.route('/login')
def render_login_page():
    return render_template('registration.html', eventURL='/login-user')


@app.route('/login-user', methods=["POST"])
def login_user():
    username = request.form['username']
    password = request.form['password']
    if datahandler.check_user(username, password):
        session['username'] = username
        return redirect(url_for('root'))
    return render_template('registration.html', eventURL="/login-user",
                           error_message="Invalid Username/Password combination provided.")


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('root'))


def main():
    app.run()


if __name__ == '__main__':
    main()
