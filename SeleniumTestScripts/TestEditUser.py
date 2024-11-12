from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

def test_edit_user(username, password, url):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)

    # Vi trang admin yeu cau phai dang nhap truoc khi thuc hien cac thao tac khac nen chung ta can dang nhap truoc
    try:
        driver.get(url)
        wait = WebDriverWait(driver, 10)
        print("Logging in...")
        time.sleep(2)

        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        username_field.send_keys(username)
        time.sleep(1)

        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        password_field.send_keys(password)
        time.sleep(1)

        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        print("Navigating to user management...")
        time.sleep(5)
        driver.get("http://localhost:3000/admin/users")

        table = wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        time.sleep(3)

        print("Looking for a user with role 'User'...")
        rows = table.find_elements(By.TAG_NAME, "tr")
        target_row = None

        for row in rows:
            try:
                role_span = row.find_element(By.CSS_SELECTOR, "span.rounded-full")
                if role_span.text == "User":
                    target_row = row
                    break
            except:
                continue

        if target_row is None:
            print("No user with role 'User' found")
            return

        print("Opening edit modal...")
        edit_button = target_row.find_element(By.XPATH, ".//button[text()='Edit']")
        edit_button.click()
        time.sleep(2)

        modal = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.fixed.inset-0")))

        username_input = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, "input.mt-1.block.w-full.rounded-md")))
        email_input = modal.find_element(By.CSS_SELECTOR, "input[type='email']")
        role_select = modal.find_element(By.TAG_NAME, "select")

        print("Updating user information...")
        username_input.clear()
        time.sleep(1)
        new_username = f"staff_user_{int(time.time())}"
        username_input.send_keys(new_username)
        time.sleep(1)

        email_input.clear()
        time.sleep(1)
        new_email = f"staff{int(time.time())}@example.com"
        email_input.send_keys(new_email)
        time.sleep(1)

        print("Changing role to Staff...")
        Select(role_select).select_by_visible_text("Staff")
        time.sleep(2)

        print("Saving changes...")
        save_button = modal.find_element(By.XPATH, "//button[text()='Save Changes']")
        save_button.click()

        time.sleep(5)

        print("Verifying changes...")
        try:
            updated_row = wait.until(EC.presence_of_element_located(
                (By.XPATH, f"//td[contains(text(), '{new_username}')]")))
            print(f"User update successful!")
            print(f"New username: {new_username}")
            print(f"New email: {new_email}")
            print("New role: Staff")
        except:
            print("Failed to verify user update")

        time.sleep(5)

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    USERNAME = "lamtran"
    PASSWORD = "lamtran"

    test_edit_user(USERNAME, PASSWORD, LOGIN_URL)
