from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_login(username, password, url):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)
    driver.get('https://cacert.org/')
    try:
        driver.get(url)

        wait = WebDriverWait(driver, 10)
        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

        username_field.send_keys(username)
        password_field.send_keys(password)

        login_button.click()

        time.sleep(10)

        try:
            error = driver.find_element(By.CSS_SELECTOR, ".bg-red-500\\/10")
            print("Login failed: Error message displayed")
        except:
            print("Login successful")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    USERNAME = "lamtran"
    PASSWORD = "lamtran"

    test_login(USERNAME, PASSWORD, LOGIN_URL)
