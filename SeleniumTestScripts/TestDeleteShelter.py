from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_login_and_delete_shelter(username, password, url):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)

    try:
        driver.get(url)
        wait = WebDriverWait(driver, 10)
        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

        username_field.send_keys(username)
        password_field.send_keys(password)
        login_button.click()

        driver.get("http://localhost:3000/admin/shelters")
        time.sleep(2)

        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table")))

        delete_button = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, "button.text-red-600")
        ))

        delete_button.click()

        alert = driver.switch_to.alert
        alert.accept()

        success_message = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, ".Toastify__toast--success")
        ))

        if success_message:
            print("Shelter deleted successfully")
        else:
            print("Failed to delete shelter")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        time.sleep(2)
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    ADMIN_USERNAME = "long"
    ADMIN_PASSWORD = "long"

    test_login_and_delete_shelter(ADMIN_USERNAME, ADMIN_PASSWORD, LOGIN_URL)
