from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField,IntegerField,FloatField
from wtforms.validators import Email, DataRequired
class LoginForm(FlaskForm):
    username = StringField('Username',
                         id='username_login',
                         validators=[DataRequired()])
    password = PasswordField('Password',
                             id='pwd_login',
                             validators=[DataRequired()])
class CreateAccountForm(FlaskForm):
    username = StringField('Username',
                         id='username_create',
                         validators=[DataRequired()])
    email = StringField('Email',
                      id='email_create',
                      validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             id='pwd_create',
                             validators=[DataRequired()])
class CreateNodeDataForm(FlaskForm):
    nodeId=IntegerField('NodeId',
                         id='nodeId_create',
                         validators=[DataRequired()])
    rssi=FloatField('Rssi',id='rssi_create',
                         validators=[DataRequired()])
    snr=FloatField('Snr',id='snr_create',
                         validators=[DataRequired()])
    data=FloatField('Data',id='data_create',
                         validators=[DataRequired()])
    
