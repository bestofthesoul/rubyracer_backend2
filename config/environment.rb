# Set up gems listed in the Gemfile.
# See: http://gembundler.com/bundler_setup.html
#      http://stackoverflow.com/questions/7243486/why-do-you-need-require-bundler-setup
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])
# Require gems we care about
require 'rubygems'
require 'pathname'

require 'pg'
require 'active_record'
require 'logger'

require 'sinatra'
require "sinatra/reloader" if development?

require 'erb'
require 'uri'

require 'byebug'

# Some helper constants for path-centric logic
APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
APP_NAME = APP_ROOT.basename.to_s



### (CMV) ###
# Set up the Controllers and helpers
Dir[APP_ROOT.join('app', 'controllers', '*.rb')].each { |file| require file }
Dir[APP_ROOT.join('app', 'helpers', '*.rb')].each { |file| require file }

# Set up the database and Models
require APP_ROOT.join('config', 'database')

# Setup Views
set :views, File.join(APP_ROOT, "app", "views")


#----
# Setup sessions, logging and dump_errors
use Rack::Session::Cookie, expire_after: ENV['SESSION_EXPIRE'] || 2592000, # seconds
                           secret: ENV['SESSION_SECRET'] || 'this is a secret shhhhh'
set :logging, true
set :dump_errors, false
set :app_file, __FILE__
enable :sessions

