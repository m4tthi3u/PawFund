from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_login_and_delete_event(username, password, login_url):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)

    try:
        driver.get(login_url)
        time.sleep(3)
        wait = WebDriverWait(driver, 15)

        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        time.sleep(2)
        username_field.send_keys(username)

        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        time.sleep(2)
        password_field.send_keys(password)

        time.sleep(2)
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        time.sleep(6)
        driver.get("http://localhost:3000/admin/events")
        time.sleep(4)

        wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        time.sleep(3)

        delete_button = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, "button.text-red-600")))
        time.sleep(2)
        delete_button.click()

        time.sleep(5)
        alert = driver.switch_to.alert
        time.sleep(2)
        alert.accept()

        time.sleep(6)
        print("Event deleted successfully")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        time.sleep(4)
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    USERNAME = "long"
    PASSWORD = "long"

    test_login_and_delete_event(USERNAME, PASSWORD, LOGIN_URL)
