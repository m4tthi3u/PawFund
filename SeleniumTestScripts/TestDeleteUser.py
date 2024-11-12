from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Vi trang admin yeu cau phai dang nhap truoc khi thuc hien cac thao tac khac nen chung ta can dang nhap truoc
def test_delete_user(username, password, url):
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

        time.sleep(5)

        search_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Search users...']")))
        search_field.clear()
        search_field.send_keys("johndoe")

        time.sleep(5)

        delete_button = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Delete')]")))
        delete_button.click()

        time.sleep(5)
        alert = driver.switch_to.alert
        alert.accept()

        time.sleep(5)

        try:
            driver.find_element(By.XPATH, f"//td[contains(text(), 'user_to_delete')]")
            print("Delete failed: User still exists")
        except:
            print("Delete successful: User no longer exists")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    ADMIN_USERNAME = "lamtran"
    ADMIN_PASSWORD = "lamtran"

    test_delete_user(ADMIN_USERNAME, ADMIN_PASSWORD, LOGIN_URL)
